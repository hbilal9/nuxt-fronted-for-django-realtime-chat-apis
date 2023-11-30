<script setup lang="ts">
import { PaperPlaneIcon } from '@radix-icons/vue'
import useWebsocket from '~/composables/useWebsocket';
import { useAuthStore } from '~/stores/useAuthStore';
import { useLastSeen } from '~/composables/useMoment';

const authStore = useAuthStore()

type ThreadUser = {
    id: number,
    full_name: string,
    username: string,
    avatar: string,
    active_status: string,
    last_seen: string,
}

type Thread = {
    id: number,
    first_person: ThreadUser | number,
    second_person: ThreadUser | number,
    created_at: string,
    updated_at: string,
}

type Message = {
    send_from: number,
    thread_id: number,
    text: string,
}

const threads = ref<Thread[]>([] as Thread[])

const selectedThread = ref<Thread>()

const changeChat = (threadId: number) => {
    chatData.thread_id = threadId + ''
    threads.value = threads.value.filter(thread => {
        if (thread.id == threadId){
            selectedThread.value = thread
            return thread
        }else {
           return thread;
        }
    })
}

const chatData = reactive({
    send_from: authStore.user?.id,
    thread_id: '',
    text: ''
})

const socket = ref()
const messages = ref<Message[]>([] as Message[]);
onMounted(() => {
    socket.value = useWebsocket(`thread/${authStore.user.username}/`);
    socket.value.onopen = function(e: any) {
        console.log('[open] Connection established');
    }

    socket.value.onmessage = function(event:any) {
        let data = JSON.parse(event.data) as any
        // console.log(`[message] Data received from server:`, data);
        if(data.type == 'send_online_status'){
            threads.value = threads.value.map(thread => {
                if(thread.id == data.id){
                    if (typeof(data.first_person) == 'number' && typeof(data.second_person) == 'object'){
                        if (typeof(thread.second_person) == 'object'){
                            thread.second_person.active_status = data.second_person.active_status
                            thread.second_person.last_seen = data.second_person.last_seen
                        }
                    }
                    else if(typeof(data.first_person) == 'object' && typeof(data.second_person) == 'number'){
                        // console.log('1st person is online' )
                        (thread.first_person as ThreadUser).active_status = data.first_person.active_status
                        (thread.first_person as ThreadUser).last_seen = data.first_person.last_seen
                        if (typeof(thread.first_person) == 'object'){
                            thread.first_person.active_status = data.first_person.active_status
                            thread.first_person.last_seen = data.first_person.last_seen
                        }
                    }
                }
                return thread
            })
            // console.log('val', val)
        }else if (data.type == 'new_message'){
            messages.value.push(data)
        }
    };

});

onUnmounted(() => {
    socket.value.close()
    console.log('closed')
})

const getThreads = async () => {
    const { data, pending, error } = await useHttp.get('chats/')

    if(data?.value){
        threads.value = data.value as Thread[]
    }
}
getThreads()

const displayThreadUser = (thread: Thread) => {
    if(typeof(thread.first_person) == 'number' && typeof(thread.second_person) == 'object'){
        return thread.second_person
    }else if(typeof(thread.first_person) == 'object' && typeof(thread.second_person) == 'number'){
        return thread.first_person
    }
}

const sendMsg = async () => {
    socket.value.send(
        JSON.stringify({
            'data': chatData
        })
    )
    chatData.text = ''
}

definePageMeta({
    middleware: 'auth',
});
</script>
<template>
    <div>
        <UiCard class="my-4 flex h-screen">
            <UiCard class="w-72 rounded-tr-none rounded-br-none">
                <UiCardHeader>
                    Conversations
                </UiCardHeader>
                <UiScrollArea>
                    <UiCardContent class="py-5 flex flex-col">
                        <span
                            v-for="user in threads"
                            :key="user.id"
                            class="font-semibold rounded p-4 px-8 cursor-pointer"
                            :class="user.id == selectedThread?.id ? 'bg-slate-200 ' : ''"
                            @click="changeChat(user.id)"
                        >
                            {{ displayThreadUser(user)?.full_name }}
                            <sub v-if="displayThreadUser(user)?.active_status !== ''" class="text-green-600 text-end">
                                {{displayThreadUser(user)?.active_status}}
                            </sub>
                            <span v-else class="text-[0.5rem] text-end -mt-4"> <br>{{ useLastSeen(displayThreadUser(user)?.last_seen as string) }}</span>
                        </span>
                    </UiCardContent>
                </UiScrollArea>
            </UiCard>
            <UiCard class="w-full rounded-tl-none rounded-bl-none">
                <UiCardHeader>
                    <div>
                        Chat <span v-if="selectedThread">with {{  displayThreadUser(selectedThread)?.full_name }}</span>
                    </div> 
                </UiCardHeader>
                <UiCardContent>
                    <div v-if="!selectedThread" class="text-center text-2xl">Select User To chat</div>
                    <UiScrollArea v-else class="w-full h-[450px]">
                        <div class="flex flex-col">
                            <span
                                v-for="(msg, i) in messages"
                                :key="i"
                                class="p-4 rounded-lg w-60 mb-1"
                                :class="msg.send_from == authStore.user.id ? 'self-end bg-green-200' : 'self-start bg-gray-200 '"
                            >
                                {{ msg.text }}
                            </span>
                            <!-- <span class="p-4 rounded-lg bg-green-200 w-60 self-end">hey am good, how about you ?</span> -->
                        </div>
                    </UiScrollArea>
                    <div class="flex w-full items-center gap-1.5" v-if="selectedThread">
                        <UiInput
                            v-model="chatData.text"
                            placeholder="Type something..."
                            @keyup.enter="sendMsg"
                        />
                        <UiButton @click="sendMsg">
                            Send <PaperPlaneIcon class="w-4 h-4 -rotate-45 ml-2 mb-1" />
                        </UiButton>
                    </div>
                </UiCardContent>
            </UiCard>
        </UiCard>
    </div>
</template>
import './style.css';
import {
  createTRPCClient,
  httpLink,
  wsLink,
  splitLink,
  createWSClient,
} from '@trpc/client';

// Assuming AppRouter is properly exported and part of your server definitions
import type { AppRouter } from '../../backend/src/trcp/app-router.ts';
import { Post } from '../../backend/src/trcp/routes/post-router/data.ts';

// Set up WebSocket client for browser environment
const wsClient = createWSClient({
  url: 'ws://localhost:2022',
});

// Create a tRPC client
const trpc = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition(op) {
        return op.type === 'subscription';
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpLink({
        url: 'http://localhost:2022',
      }),
    }),
  ],
});

async function fetchHello() {
  try {
    const helloResponse = await trpc.greeting.hello.query({
      name: 'world',
    });
    console.log('helloResponse', helloResponse);
  } catch (error) {
    console.error('An error occurred while fetching hello:', error);
  }
}

async function createPost() {
  try {
    const input = document.querySelector<HTMLInputElement>('#postInput')!;
    const createPostRes = await trpc.post.createPost.mutate({
      title: input.value,
      text: 'check out https://tRPC.io',
    });
    console.log('createPostResponse', createPostRes);
    // Clear the input field
    input.value = '';
  } catch (error) {
    console.error('An error occurred while creating a post:', error);
  }
}

async function testSubscription() {
  try {
    await trpc.post.postUpdates.subscribe(
      undefined,
      {
        onData(value) {

          const postList = document.getElementById('postList');
          if (!postList) return;

          // Clear the list
          postList.innerHTML = '';

          (value as unknown as Post[]).forEach(post => {
            const li = document.createElement('li');
            li.textContent = `${post.title} - ✅`;
            li.setAttribute('data-id', post.id); // puede ser útil para más tarde
            postList.appendChild(li);
          });
        },
      }
    );
  } catch (error) {
    console.error('An error occurred while creating a post:', error);

  }
}

testSubscription()
document.querySelector<HTMLButtonElement>('#fetchHello')!.addEventListener('click', fetchHello);
document.querySelector<HTMLButtonElement>('#createPost')!.addEventListener('click', createPost);
document.querySelector<HTMLInputElement>('#postInput')!.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      createPost();
      event.preventDefault();
  }
});
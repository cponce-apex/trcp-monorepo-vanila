export type Post = {
  title: string;
  text: string;
  id: string;
};

type Subscriber = (posts: Post[]) => void;

export class PostsObservable {
  posts: Post[];

  subscribers: Subscriber[];

  constructor() {
    this.posts = [];
    this.subscribers = [];
  }

  // Agrega un nuevo post y notifica a los suscriptores
  addPost(post: Post) {
    this.posts.push(post);
    this.notify();
  }

  // Registra un nuevo suscriptor
  subscribe(callback: Subscriber) {
    this.subscribers.push(callback);
    // Envía el estado inicial al nuevo suscriptor
    callback(this.posts);
    // Devuelve una función para cancelar la suscripción
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  }

  // Notifica a todos los suscriptores actuales
  notify() {
    this.subscribers.forEach((sub) => sub(this.posts));
  }
}

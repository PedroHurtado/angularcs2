import { Component } from '@angular/core';
import { PostComments } from '../post-comments/post-comments';

@Component({
  selector: 'app-post',
  imports: [PostComments],
  templateUrl: './post.html',
  styleUrl: './post.css'
})
export class Post {
  data = Array.from({ length: 100 }, (_, i) => i+1);
}

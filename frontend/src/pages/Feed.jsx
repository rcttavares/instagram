import { Component } from 'react';
import io from 'socket.io-client';
import api, { API_URL } from '../services/api';

import './Feed.css';

import coment from '../assets/comment.svg';
import like from '../assets/like.svg';
import more from '../assets/more.svg';
import send from '../assets/send.svg';

class Feed extends Component {
  state = {
    feed: [],
    openMenuId: null,
    editingId: null,
    editDescription: '',
    editHashtags: '',
  };

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get('posts');

    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const socket = io(API_URL);

    socket.on('post', (newPost) => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on('like', (likedPost) => {
      this.setState({
        feed: this.state.feed.map((post) =>
          post._id === likedPost._id ? likedPost : post,
        ),
      });
    });

    socket.on('post:updated', (updatedPost) => {
      this.setState({
        feed: this.state.feed.map((post) =>
          post._id === updatedPost._id ? updatedPost : post,
        ),
      });
    });

    socket.on('post:deleted', (deletedId) => {
      this.setState({
        feed: this.state.feed.filter((post) => post._id !== deletedId),
      });
    });
  };

  handleLike = (id) => {
    api.post(`/posts/${id}/like`);
  };

  toggleMenu = (id) => {
    this.setState({ openMenuId: this.state.openMenuId === id ? null : id });
  };

  closeMenu = () => {
    this.setState({ openMenuId: null });
  };

  handleDelete = async (id) => {
    if (!window.confirm('Excluir esse post?')) return;

    await api.delete(`/posts/${id}`);

    this.setState({
      feed: this.state.feed.filter((post) => post._id !== id),
      openMenuId: null,
    });
  };

  startEdit = (post) => {
    this.setState({
      openMenuId: null,
      editingId: post._id,
      editDescription: post.description,
      editHashtags: post.hashtags,
    });
  };

  cancelEdit = () => {
    this.setState({ editingId: null, editDescription: '', editHashtags: '' });
  };

  handleEditChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveEdit = async (id) => {
    const response = await api.put(`/posts/${id}`, {
      description: this.state.editDescription,
      hashtags: this.state.editHashtags,
    });

    this.setState({
      feed: this.state.feed.map((post) =>
        post._id === id ? response.data : post,
      ),
      editingId: null,
    });
  };

  render() {
    return (
      <section id='post-list'>
        {this.state.feed.map((post) => (
          <article key={post._id}>
            <header>
              <div className='user-info'>
                <span>{post.author}</span>
                <span className='place'>{post.place}</span>
              </div>

              <button type='button' onClick={() => this.toggleMenu(post._id)}>
                <img src={more} alt='Mais' />
              </button>
            </header>

            <img
              src={
                post.image.startsWith('http')
                  ? post.image
                  : `${API_URL}/files/${post.image}`
              }
              alt=''
            />

            <footer>
              <div className='actions'>
                <button type='button' onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt='' />
                </button>
                <img src={coment} alt='' />
                <img src={send} alt='' />
              </div>

              <strong>{post.likes} curtidas</strong>

              {this.state.editingId === post._id ? (
                <div className='edit-post'>
                  <input
                    type='text'
                    name='editDescription'
                    value={this.state.editDescription}
                    onChange={this.handleEditChange}
                  />
                  <input
                    type='text'
                    name='editHashtags'
                    value={this.state.editHashtags}
                    onChange={this.handleEditChange}
                  />
                  <div className='edit-actions'>
                    <button type='button' onClick={() => this.saveEdit(post._id)}>
                      Salvar
                    </button>
                    <button type='button' onClick={this.cancelEdit}>
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <p>
                  {post.description}
                  <span>{post.hashtags}</span>
                </p>
              )}
            </footer>

            {this.state.openMenuId === post._id && (
              <div className='post-options-overlay' onClick={this.closeMenu}>
                <div
                  className='post-options-modal'
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type='button'
                    className='danger'
                    onClick={() => this.handleDelete(post._id)}
                  >
                    Excluir
                  </button>
                  <button type='button' onClick={() => this.startEdit(post)}>
                    Editar
                  </button>
                  <button type='button' onClick={this.closeMenu}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </section>
    );
  }
}

export default Feed;

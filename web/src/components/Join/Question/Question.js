import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormText, ButtonGroup } from 'reactstrap';

import Socket from '../../../socket';

import { Questions } from '../../../api';
import { userSelectors } from '../../../state/ducks/user';

import './Question.css';

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.question,
      isLiked: !!props.question.likes.find(({ user }) => user === props.user._id),
    };

    this.isOwner = this.isOwner.bind(this);
    this.like = this.like.bind(this);
    this.highlight = this.highlight.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
  }

  isOwner() {
    return this.props.isLoggedIn && this.props.event.owner === this.props.user._id;
  }

  async like(e) {
    e.preventDefault();

    try {
      let question;

      if (this.state.isLiked) {
        question = await Questions.unlike(this.state);
      } else {
        question = await Questions.like(this.state);
      }

      Socket.publishQuestionChanges('update', question);

      if (this.props.onUpdate) {
        this.props.onUpdate(question);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async highlight(e) {
    e.preventDefault();

    try {
      let question;

      if (this.state.highlighted) {
        question = await Questions.unhighlight(this.state);
      } else {
        question = await Questions.highlight(this.state);
      }

      Socket.publishQuestionChanges('update', question);

      if (this.props.onUpdate) {
        this.props.onUpdate(question);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async edit(e) {
    e.preventDefault();

    const description = window.prompt('Update question:', this.state.description);

    if (description && description !== this.state.description) {
      try {
        const question = await Questions.update({
          ...this.state,
          description,
        });

        Socket.publishQuestionChanges('update', question);

        if (this.props.onUpdate) {
          this.props.onUpdate(question);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  }

  async remove(e) {
    e.preventDefault();

    if (window.confirm(`Remove the question "${this.state.description}"?`)) {
      try {
        const question = await Questions.remove(this.state);

        Socket.publishQuestionChanges('remove', question);

        if (this.props.onRemove) {
          this.props.onRemove(question);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  }

  render() {
    return (
      <div className="question">
        <FormText className="muted">
          By Annonymous at {new Date(this.state.createdAt).toLocaleString()}
        </FormText>

        <div className="description">{this.state.description}</div>

        <div className="actions clearfix">
          <Button className={`${this.state.isLiked ? 'active' : ''}`} size="sm" outline color="primary" onClick={this.like}>{this.state.meta.numLikes} | Like</Button>

          {this.isOwner() && <ButtonGroup className="owner-actions float-right" size="sm">
            <Button className={`${this.state.highlighted ? 'active' : ''}`} outline color="primary" onClick={this.highlight}>Highlight</Button>

            <Button outline color="primary" onClick={this.edit}>Edit</Button>

            <Button outline color="primary" onClick={this.remove}>Remove</Button>
          </ButtonGroup>}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  isLoggedIn: userSelectors.isLoggedIn(state),
  user: userSelectors.getUser(state),
}))(Question);

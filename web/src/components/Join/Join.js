import React, { Component } from 'react';
import { ButtonGroup, Button, ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';

import Socket from '../../socket';

import Question from './Question';
import NewQuestion from './NewQuestion';

import { Events, Questions } from '../../api';

import './Join.css';

class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: 'likes',
      order: -1,
      event: null,
      questions: [],
    };

    this.sort = this.sort.bind(this);
    this.sortQuestions = this.sortQuestions.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.removeQuestion = this.removeQuestion.bind(this);

    Socket.subscribeToQuestionChanges('add', this.addQuestion);
    Socket.subscribeToQuestionChanges('update', this.updateQuestion);
    Socket.subscribeToQuestionChanges('remove', this.removeQuestion);
  }

  sort(questions) {
    // sort questions
    const highlighted = questions.filter(({ highlighted }) => highlighted).sort((q1, q2) => {
      if (this.state.sort === 'likes') {
        return q2.meta.numLikes - q1.meta.numLikes;
      } else {
        return new Date(q2).getTime() - new Date(q1).getTime();
      }
    });
    const rest = questions.filter(({ highlighted }) => !highlighted).sort((q1, q2) => {
      if (this.state.sort === 'likes') {
        return q2.meta.numLikes - q1.meta.numLikes;
      } else {
        return new Date(q2).getTime() - new Date(q1).getTime();
      }
    });

    return highlighted.concat(rest);
  }

  async getEvent() {
    const event = await Events.join(this.props.match.params.code);
    const questions = await this.getQuestions(event);

    this.setState({
      event,
      questions: this.sort(questions),
    });
  }

  async getQuestions(event, sort = this.state.sort, order = this.state.order) {
    const questions = await Questions.getList(event._id, sort, order);

    return questions;
  }

  async sortQuestions(sort, order) {
    this.setState({
      sort,
      order,
    }, async () => {
      const questions = await this.getQuestions(this.state.event, sort, order);
  
      this.setState({
        questions: [],
      }, () => this.setState({
        questions: this.sort(questions),
      }));
    });
  }

  addQuestion(question) {
    this.setState({
      questions: this.sort([
        ...this.state.questions,
        question,
      ]),
    });
  }

  updateQuestion(question) {
    const questions = this.state.questions.map(q => {
      if (q._id === question._id) {
        return question;
      }

      return q;
    });

    this.setState({
      questions: [],
    }, () => this.setState({
      questions: this.sort(questions),
    }));
  }

  removeQuestion(question) {
    this.setState({
      questions: this.state.questions.filter(q => q._id !== question._id),
    });
  }

  render() {
    return (
      <div className="join">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>{this.state.event ? this.state.event.title : 'Join'}</BreadcrumbItem>
        </Breadcrumb>

        {this.state.event && (
          <div className="event">
            <h4 className="title">{this.state.event.title}</h4>

            <FormText className="muted">
              <span>Code: {this.state.event.code}</span> | <span>
              {new Date(this.state.event.period.from).toLocaleDateString()} - {new Date(this.state.event.period.to).toLocaleDateString()}</span>
            </FormText>

            <div className="description">{this.state.event.description}</div>

            <hr />

            <div className="questions">
              <div className="actions clearfix">
                <span>{this.state.questions.length} questions</span>

                <ButtonGroup className="float-right" size="sm">
                  <Button className={this.state.sort === 'likes' && this.state.order === -1 ? 'active' : ''} outline color="primary" onClick={e => this.sortQuestions('likes', -1)}>Most Likes</Button>
                  <Button className={this.state.sort === 'created-time' && this.state.order === -1 ? 'active' : ''} outline color="primary" onClick={e => this.sortQuestions('created-time', -1)}>Newest</Button>
                </ButtonGroup>
              </div>
              <ListGroup>
                {this.state.questions.map(question => (
                  <ListGroupItem color={question.highlighted ? 'info' : ''} key={question._id} action>
                    <Question event={this.state.event} question={question} onUpdate={this.updateQuestion} onRemove={this.removeQuestion} />
                  </ListGroupItem>
                ))}

                <ListGroupItem action>
                  <NewQuestion event={this.state.event} onSuccess={this.addQuestion} />
                </ListGroupItem>
              </ListGroup>
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.getEvent();
  }
}

export default Join;

import React, { useEffect, useState, useContext } from 'react';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import { fetchTopics, addTopics } from '../utils/api';
import { Link, Redirect } from 'react-router-dom';
import ITopicData from '../interfaces/topic.interface';
import UserContext from '../contexts/UserContext';
import ITopicQueryData from '../interfaces/topicQueryData.interface';

const TopicChoice: React.FC<IPage> = (props) => {
  const { user, setUser } = useContext(UserContext);

  const [topics, setTopics] = useState<ITopicData[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setSubmitted(false);
    logging.info(`Loading ${props.name}`);
    fetchTopics().then((result) => {
      const topicsArr = result.map((topic: ITopicQueryData) => {
        const newTopic = {
          id: topic._id,
          name: topic.name,
          slug: topic.slug,
          popularity: topic.popularity,
          desc: topic.desc,
          imgUrl: topic.imgUrl,
          toggled: false,
        };
        return newTopic;
      });
      setTopics(topicsArr);
    });
  }, [props.name]);

  const handleToggle = (e: React.SyntheticEvent) => {
    const toggledID = (e.target as Element).id;
    topics.forEach((topic) => {
      if (topic.id === toggledID) {
        topic.toggled = !topic.toggled;
      }
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsError(false);
    const topicArr: string[] = [];
    topics.forEach((topic) => {
      if (topic.toggled) {
        topicArr.push(topic.slug);
      }
    });
    const user_id = user._id;
    if (topicArr.length > 0) {
      addTopics(user_id, topicArr)
        .then((patchedUser) => {
          setUser(patchedUser);
          localStorage.setItem('devCakeUser', JSON.stringify(patchedUser));
          setSubmitted(true);
        })
        .catch((err) => {
          setIsError(true);
        });
    } else {
      setIsError(true);
    }
  };

  if (submitted) {
    return <Redirect push to={{ pathname: '/media-choice' }} />;
  }

  return (
    <div>
      <Link key="home" to="/">
        Home
      </Link>
      <Link key="media-choice" to="/media-choice">
        Media Choice
      </Link>
      <h1>What do you want to follow? </h1>
      <div>
        {topics.map((topic) => {
          return (
            <button
              id={topic.id}
              key={topic.id}
              name={`${topic.name}-button`}
              className={`${topic.name}__button`}
              onClick={handleToggle}
            >
              {topic.name}
            </button>
          );
        })}
      </div>
      <br />
      <button type="submit" onClick={handleSubmit}>
        Next
      </button>
      {isError ? <p>At least one topic must be selected</p> : null}
    </div>
  );
};

export default TopicChoice;

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

/**
 * @TODO: Define all the actions (creator) for the talks state
 */
const ActionType = {
  RECEIVE_TALKS: 'RECEIVE_TALKS',
  ADD_TALK: 'ADD_TALK',
  TOGGLE_LIKE_TALK: 'TOGGLE_LIKE_TALK',
};

function receiveTalkActionCreator(talks) {
  return {
    type: ActionType.RECEIVE_TALKS,
    payload: {
      talks,
    },
  };
}

function addTalkActionCreator(talk) {
  return {
    type: ActionType.ADD_TALK,
    payload: {
      talk,
    },
  };
}

function toggleLikeActionCreator({ talkId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_TALK,
    payload: {
      talkId,
      userId,
    },
  };
}

function asyncAddTalk({ text, replyTo = '' }) {
  return async (dispatch) => {
    try {
      const talk = await api.createTalk({ text, replyTo });
      dispatch(addTalkActionCreator(talk));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleLikeTalk(talkId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleLikeActionCreator({ talkId, userId: authUser.id }));

    try {
      await api.toggleLikeTalk(talkId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeActionCreator({ talkId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveTalkActionCreator,
  addTalkActionCreator,
  toggleLikeActionCreator,
  asyncToggleLikeTalk,
  asyncAddTalk,
};

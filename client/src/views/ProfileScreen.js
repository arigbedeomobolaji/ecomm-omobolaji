// jshint ignore:start
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfileAction, userDetailsAction } from '../actions/userSigninAction';
import LoadingBox from '../components/loadingbox/LoadingBox';
import MessageBox from '../components/messagebox/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector(state => state.userDetails);
  const {error, loading, user } = userDetails;
  const updateUserProfile = useSelector(state => state.updateUserProfile)
  const {error: errorUpdate, success: successUpdate, loading: loadingUpdate} = updateUserProfile

  useEffect(() => {
    if(!user){
      dispatch({type: USER_UPDATE_PROFILE_RESET})
      return dispatch(userDetailsAction(userInfo._id));
    }
    setName(user.name);
    setEmail(user.email);
  }, [dispatch, userInfo._id, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password === confirmPassword){
      dispatch(updateUserProfileAction({userId: user._id, name, email, password }))
    }else{
      alert("password and confirm password must be the same.");
    }
  }
  return (
    <div>
      {
        loadingUpdate ? <MessageBox><LoadingBox /></MessageBox> :
        !!errorUpdate ? <MessageBox variant="danger">{errorUpdate}</MessageBox> :
        !!successUpdate && <MessageBox variant="success">Profile Successfully Updated.</MessageBox>
      }
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>User Profile</h1>
        </div>
        {
          loading ? <LoadingBox></LoadingBox> :
          !!error ? <MessageBox variant="danger"></MessageBox> : !!user &&
          (
            <>
              <div className="form__group">
                  <label htmlFor="name">Name</label>
                  <input
                    className="form__input" 
                    type="text"
                    id="name"
                    placeholder="enter name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="email">Email</label>
                  <input
                    className="form__input" 
                    type="email"
                    id="email"
                    placeholder="enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="password">Password</label>
                  <input
                    className="form__input" 
                    type="password"
                    id="password"
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <label className="form__label" htmlFor="confirmPassword">confirmPassword</label>
                  <input
                    className="form__input" 
                    type="password"
                    id="confirmPassword"
                    placeholder="enter confirm password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <label />
                  <button
                    type="submit"
                    className="button--primary button--block"
                  > Update
                  </button>
                </div>
            </>
          )
        }
      </form>
    </div>
  )
}

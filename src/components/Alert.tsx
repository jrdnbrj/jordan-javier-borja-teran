import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearAlert } from '../features/alert/alertSlice';

const Alert: React.FC = () => {
    const dispatch = useDispatch();
    const alert = useSelector((state: RootState) => state.alert);

    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => {
                dispatch(clearAlert());
            }, 5000);

            return () => clearTimeout(timer);
        }
    });

    if (!alert.message) return null;

    return (
        <div className={`alert`}>
            <p>{alert.message}</p>
            <button onClick={() => dispatch(clearAlert())}>X</button>
        </div>
    );
};

export default Alert;

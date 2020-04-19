import React, { useState, useEffect} from 'react';
import { MobileView } from "react-device-detect";
import RoomSelection from '../components/Home/Mobile/RoomSelection';
import { get } from '../config/request';

const HomeView: React.FC = () => {
    const [rooms, setRooms] = useState<string[]>([]);

    useEffect(() =>{
        get(
            "/home",
            response => {
                setRooms(response.data)
            },
            error => console.error(error)
        )
    }, []);
    return (
        <React.Fragment>
            <MobileView>
                <RoomSelection
                    rooms={rooms}
                />
            </MobileView>
        </React.Fragment>
    )
}

export default HomeView;

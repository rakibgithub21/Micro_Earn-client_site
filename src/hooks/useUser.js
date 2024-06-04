import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useUser = () => {
    const { user, loading } = useContext(AuthContext)

    //fetch user info using logged in user
    // TODO:Do it using axios secure
    const { data, isLoading } = useQuery({
        queryKey: ['data', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/user/${user?.email}`)
            return data
        }
    })


    return [data, isLoading]
};

export default useUser;
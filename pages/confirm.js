import { useRouter } from 'next/router';

const Confirm = () => {

    const router = useRouter();

    const goToTeams = () => {
        router.push("/myTeams")
    }

    return <div>
        User is logged in.
        <button onClick={goToTeams}> GO TO TEAMS PAGE </button>
    </div>
}

export default Confirm;
import './App.css'
import {MediaQuery} from "./components/MediaQuery.tsx";
import {useMediaQuery} from "./hooks/useMediaQuery.tsx";

const TestComponent = () => {
    const matchesPortrait = useMediaQuery({
        query: '(max-width: 1200px)'
    });

    return <>
    { matchesPortrait && <div>I'm portrait orientation</div> }
    </>
};

function App() {
  return (
    <>
        <MediaQuery minWidth={1800}>
            {(matches) =>
                matches
                    ? <p>You are retina</p>
                    : <p>You are not retina</p>
            }
        </MediaQuery>
        <TestComponent />
    </>
  )
}

export default App

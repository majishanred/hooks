import './App.css'
import {useDocumentVisibility} from "./hooks/useDocumentVisibility.ts";
import {useEffect} from "react";

const TestComponent = () => {
    const { count, isVisible, onVisibilityChange } = useDocumentVisibility();

    useEffect(() => {
        onVisibilityChange((isVisible) => {
            console.log('first handler', isVisible)
        });

        const unsubscribeSecondHandler = onVisibilityChange((isVisible) => {
            console.log('second handler', isVisible);
        });

        setTimeout(() => unsubscribeSecondHandler(), 5000); // отписываемся от 'second handler' через 5 секунд
    }, [])

    return (
        <div>
      <span>
        Вы покинули страницу: {count} раз
        Вкладка активна? {isVisible ? 'да' : 'нет'}
      </span>
        </div>
    );
};

function App() {
  return (
    <>
        <TestComponent />
    </>
  )
}

export default App

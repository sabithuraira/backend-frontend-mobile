import { NavigationContainer } from "@react-navigation/native";
import Routes from './routes/routes'

const App = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
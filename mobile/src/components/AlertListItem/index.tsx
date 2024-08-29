import { ChevronRight } from 'lucide-react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { styles } from './styles';

interface AlertProps {
  id: string;
  message: string;
  isOpen: boolean;
  onSetOpenItem: (id: string) => void;
}

export function AlertListItem({ id, message, isOpen, onSetOpenItem }: AlertProps) {
  const rotate = useSharedValue('0deg');

  if (!isOpen) rotate.value = withSpring('0deg');
  function handleOpenItem() {
    rotate.value = withSpring('90deg');
    onSetOpenItem(id);
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handleOpenItem}>
      <View style={styles.container}>
        <View style={styles.circle}></View>
        <Text style={styles.message} numberOfLines={isOpen ? undefined : 2}>
          {message}
        </Text>
        <Animated.View
          style={{
            transform: [
              {
                rotate
              }
            ]
          }}
        >
          <ChevronRight size={12} color="#000" />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

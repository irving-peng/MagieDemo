import { Text, View, Image } from "react-native";

export default function BadgerBakedGood(props) {
    return <View>
        <Text>I am a baked good!</Text>
        <Text>{props.name}</Text>
        <Image
        style={{
            width:100,
            height:100
        }}
        source={{uri:`${props.imgSrc}`}}
        />
        <Text>${props.price}</Text>
        {
            (props.upperLimit === -1)
            ?
            <Text>unlimited can be ordered! </Text>
            
            :
            <Text>{props.upperLimit} can be ordered! </Text>
        }
        {/* <Text>Order Total: ${parseFloat((props.price * props.quantity).toFixed(2))}</Text> */}
    </View>
}

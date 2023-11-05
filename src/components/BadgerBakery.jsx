import { Text, View, Button } from "react-native";
import BadgerBakedGood from "./BadgerBakedGood";
import {useState, useEffect} from 'react';

export default function BadgerBakery() {

    // const [food, setFood] = useState({
    //     name: "Food name",
    //     price: 0,
    //     imgSrc: undefined,
    //     upperLimit: -1
    // });
    const [foods, setFoods] = useState([]);
    const [currentKey, setCurrentKey]=useState('');
    const [index, setIndex] = useState(0);
    
    const [quantity, setQuantity] = useState(0);

    useEffect (() =>{
        if(hasKey(currentKey)){

            setQuantity(ItemNQuan[currentKey]);
        }
        else{
            setQuantity(0);
        }

    }, currentItem, currentKey)
    

    //used for calcualting subtotalr
    const[ItemNQuan, setINQ] = useState({});
    function hasKey(key) {
        return ItemNQuan.hasOwnProperty(key);
      }

    
    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw7/goods", {
            headers: {
                "X-CS571-ID": "bid_a2247d869ecbfbc7b312a2a7f947579f78789ef1ddc41b3a2691deb45585e3ec"
            }
        })
        .then(res => res.json())
        .then(data => {
            setFoods(data)
            setCurrentKey(Object.keys(data)[0])

        })
        
    }, []);
    //conditional


    const currentItem = foods[currentKey] 
    || {
        name: 'Food name',
        price: 0,
        imgSrc: undefined,
        upperlimit: -1,
      }; 
    const NoPrev = (index === 0);
    const NoNext = (index ===Object.keys(foods).length -1);
    const CanDecrease = (quantity !==0)
    const CanIncrease = currentItem.upperLimit === -1 || quantity < currentItem.upperLimit 

    const previous = () =>{

        const currentIndex = index;
        if(index ===0){
            return;
        }else{
            setIndex(i => i-1);
            setCurrentKey(Object.keys(foods)[currentIndex-1]);
        }
    }
    const next = () =>{

        const currentIndex = index;
        if (index === Object.keys(foods).length -1){
            return;
        }else{
            setIndex(i => i+1);
            setCurrentKey(Object.keys(foods)[currentIndex+1]);
        }
    }
    const decreaseQuan = () =>{
        
        if (CanDecrease) {
            const newQuan = quantity - 1
            setQuantity(q => newQuan)
            const newINQ = {...ItemNQuan, [currentKey]:(newQuan)}
            setINQ(newINQ);
        }
    }
    const increaseQuan = () =>{

        if (CanIncrease) {
            const newQuan = quantity + 1
            setQuantity(newQuan)
            const newINQ = {...ItemNQuan, [currentKey]:(newQuan)}

            
            setINQ(newINQ);
        }
    }
    //reload all the values, quantity, and set up saving iten and quantity
    const calculateTotal = () =>{
        if(ItemNQuan === undefined){
            return 0
        }else{
            const keys = Object.keys(ItemNQuan);
            let total = 0
            for (const key of keys) {
                const unit = ItemNQuan[key];
                const price = foods[key].price
                subtotal = unit * price
                total += subtotal
            }
            return total
        }
    }
    const calculateItems =() => {
        if(ItemNQuan === undefined){
            return 0
        }else{
            const keys = Object.keys(ItemNQuan);
            let items = 0
            for (const key of keys) {
                items += ItemNQuan[key]
            }
            return items
        }
    }
    const order = () => {
        const totalCost = calculateTotal()
        const totalItems = calculateItems()
        alert("Order Confirmed! Your order contains "+totalItems+" items and costs $"+totalCost +" !")
        setINQ({});
    }
    return <View>
        <Text>Welcome to Badger Bakery!</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
                title="Prev" onPress={previous} disabled={NoPrev}
            />
            <Button
                title="Next" onPress={next} disabled={NoNext}
            />
        </View>
        <BadgerBakedGood key={currentKey} {...currentItem} quantity={quantity} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button title="-" onPress={decreaseQuan} disabled={!CanDecrease}/>
            <Text>{quantity}</Text> 
            <Button title="+" onPress={increaseQuan} disabled={!CanIncrease}/>
        </View>
        <Text>Order Total: ${parseFloat(calculateTotal()).toFixed(2)}</Text> 
        <Button
                title="PLACE ORDER" onPress={order} disabled={calculateTotal()===0}
            />
        
    </View>
}

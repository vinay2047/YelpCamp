const {descriptors,places}=require('./seedHelpers')
const city=require('./cities')
const Campground=require('../models/campground')
const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(()=>console.log('connected to mongoose'))
.catch(err=>{
    console.log('connection failed')
    console.log(err)
})

const sample =(arr)=>{
    return arr[Math.floor(Math.random()*arr.length)]
}
const usedb=async ()=>{
    await Campground.deleteMany({})
    for(let i=0;i<300;i++){
        const rand=city[Math.floor(Math.random()*1000)]
        const price=Math.floor(Math.random()*20)+10
        const geometry= {
                type: "Point",
                coordinates: [rand.longitude, rand.latitude]
            }
        const images= [
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                }
            ]
        const author='684b48f5d850e8dbf354e104';
        const description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi porro maiores sapiente? Facere quia earum necessitatibus illum corrupti exercitationem fugit?'
        const newCampground=new Campground({title:`${sample(descriptors)} ${ sample(places)}`, location:`${rand.city},${rand.state}`,images,price,description,author,geometry})
        
        await newCampground.save();
    }
}
usedb()

 

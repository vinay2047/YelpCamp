
const Campground = require('../models/campground');
const { cloudinary } = require("../cloudinary");
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;


module.exports.index=async (req, res) => {

    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })


}
module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new');
}
module.exports.showCampground=async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!campground) {
        req.flash('error', "Couldn't find that campground!")
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground })
}

module.exports.createCampground=async (req, res) => {
    
    const geoData = await maptilerClient.geocoding.forward(req.body.location, { limit: 1 });
    const data = req.body
    const newCampground = new Campground(data)
    newCampground.geometry = geoData.features[0].geometry;
    newCampground.images=req.files.map(f=>({url:f.path ,filename : f.filename}))
    newCampground.author = req.user._id;
    await newCampground.save()
    req.flash('success', 'Successfully created a new campground!')
    res.redirect(`/campgrounds/${newCampground._id}`)
}

module.exports.renderUpdateForm=async (req, res) => {
    const { id } = req.params
    const data = await Campground.findById(id)
    if (!data) {
        
            req.flash('error', 'Campground does not exist !')
            return res.redirect(`/campgrounds`)

        
    }
    res.render('campgrounds/edit', { data })
}


module.exports.updateCampground=async (req, res) => {
    const { id } = req.params
    const campground=await Campground.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    const geodata=maptilerClient.geocoding.forward(req.body.location,{limit :1})
    campground.geometry=geodata.features[0].geometry
    const imgs=req.files.map(f=>({url:f.path ,filename : f.filename}))
    campground.images.push(...imgs)
     if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
   
    await campground.save()
    res.redirect(`/campgrounds/${id}`)

}


module.exports.deleteCampground=async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success','Successfully deleted campground !')
    res.redirect('/campgrounds')
}
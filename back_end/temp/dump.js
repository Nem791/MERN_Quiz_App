const savePost = async (req, res) => {
    // Luu DataTransferItemList, content, image to database 
    console.log('req.body-', req.body);
    console.log('req.user-', req.user);
    let image = req.files.image;
    let files = req.files;
    for (const key in files) {
        console.log('file');
        console.log(files[key]);
        req.body = { ...req.body, [key]: '/upload/' + files[key].name }
        // files[key].mv(path.join(__dirname, '..', '/public/upload/', image.name), function (error) {
        //     console.log("error: ", error);
        // });
        await fileUploadAsync(files[key]);

    }

    // if (Array.isArray(files)) {
    //     try {
    //         const data = await Promise.all(files.map((x) => fileUploadAsync(x)));
    //         console.log("data: ", data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // } else if (typeof files === 'object') {
    //     return fileUploadAsync(files);
    // }

    console.log(req.body);

    await BlogPost.create({
        ...req.body,
        user: mongoose.Types.ObjectId(req.user._id)
    }, function (err) {
        console.log(err);
    })

};

        // }

        // if (!files) {
        //     // Tao QuizSet 
        //     set = await QuizSet.create({
        //         ...setData,
        //         user: mongoose.Types.ObjectId(req.user._id)
        //     })

        // } else {
        // set = await image.mv(path.join(__dirname, '..', '/public/upload/', image.name), function (error) {
        //     set = QuizSet.create({
        //         ...setData,
        //         quiz_img: '/upload/' + image.name,
        //         user: mongoose.Types.ObjectId(req.user._id)
        //     }, function (err) {
        //         // res.redirect('/');
        //         console.log('Files error');
        //         console.log(err);
        //         return res.json(err)
        //     })
        // });
        // }
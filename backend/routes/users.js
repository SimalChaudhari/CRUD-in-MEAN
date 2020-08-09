var express = require('express');
var router = express.Router();
const { check, validationResult} = require("express-validator");
const User = require("../model/User");

/* GET users listing. */
router.get('/', function(req, res) {
  try {
    User.find().then(users => {
      res.status(200).send({ 
        users : users,
        message : "User has been fetch successfully!"
      });
    }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes."
      });
    });
  } catch (err) {
    res.status(500).send({message : "Error in Saving"});
  }
});

/**
 * @method - POST
 * @param - /crete
 * @description - User Create
 */

router.post("/create",[
      check("firstname", "Please Enter a Valid Firstname").not().isEmpty(),
      check("lastname", "Please Enter a Valid Lastname").not().isEmpty(),
      check("role", "Please Enter a Valid role").not().isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      
        const {  firstname, lastname, role, email } = req.body;
        try {
            let user = await User.findOne({ email});
            if (user) {
                return res.status(400).json({
                    message: "User Already Exists"
                });
            }

            if(role == 'Art Manager')
            {
              let result = await User.findOne({ role : 'Art Manager'});
              if (result) {
                  return res.status(400).json({
                      message: "Art Manager Already Exists"
                  });
              }
            }

            user = new User({firstname , lastname, role, email});
            await user.save();
            
            const payload = { user: { id: user.id} };
            return res.status(200).json({
              user : user,
              message : 'User has been created successfully!'
            });
        } catch (err) {
          console.log('err',err);
          res.status(500).send({message : "Error in Saving"});
        }
    }
);


/**
 * @method - POST
 * @param - /update
 * @description - User Update
 */

router.post("/update/:Id",[
      check("firstname", "Please Enter a Valid Firstname").not().isEmpty(),
      check("lastname", "Please Enter a Valid Lastname").not().isEmpty(),
      check("role", "Please Enter a Valid role").not().isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
      
      let user = await User.findById(req.params.Id);
      if (!user && user.role != 'Art Manager') {
        let userdata = await User.findOne({ email});
        if (userdata) {
            return res.status(400).json({
                message: "User Already Exists"
            });
        }

        if(role == 'Art Manager')
        {
          let result = await User.findOne({ role : 'Art Manager'});
          if (result) {
              return res.status(400).json({
                  message: "Art Manager Already Exists"
              });
          }
        }
      }

      const { firstname, lastname, role, email } = req.body;
      try {
        // Find user and update it with the request body
        User.findByIdAndUpdate(req.params.Id, {
          firstname :  firstname,
          lastname : lastname,
          role : role,
          email : email
          }, {new: true}).then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.Id
                });
            }
            res.status(200).send({
              user : user,
              message : 'User has been updated successfuly!'
            });
          }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.Id
                });                
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.Id
            });
          });
      } catch (err) {
          res.status(500).send({message:"Error in updating"});
      }
    }
);


/**
 * @method - GET
 * @description - Get User
 * @param - /user/getuser
 */


router.get("/get/:Id", async (req, res) => {
  try {
    User.findById(req.params.Id)
    .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.Id
          });
      }
      res.status(200).send({
        user: user
      });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Could not found user with id " + req.params.Id
        });
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});



/**
 * @method -  GET
 * @description - DELETE User
 * @param - /user/delete
 */


router.get("/delete/:Id", async (req, res) => {
  try {
    User.findByIdAndRemove(req.params.Id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.Id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.Id
        });
    });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;


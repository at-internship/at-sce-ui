/**
 * AT SCE UI - AT SCE HELPER.
 * Copyright 2021 AgileThought, Inc.
 *
 * Functions for auth.helper.
 *
 * @author @at-internship
 * @version 1.0
 *
 */

// Constants
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = crypto.randomBytes(16);
const helpers = {};

/*helpers.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  let encrypted_update = cipher.update(text);
  console.debug(`helper.encrypt - encrypted_update: ${encrypted_update.toString("hex")}`);

  let encrypted_final = cipher.final();
  console.debug(`helper.encrypt - encrypted_final: ${encrypted_final.toString("hex")}`);

  const encrypted = Buffer.concat([encrypted_update, encrypted_final]);
  console.debug(`helper.encrypt - hash: ${encrypted.toString("hex")}`);
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};*/

helpers.encrypt = (text) => {
  const md5sum = crypto.createHash("md5");
  const encrypted = md5sum.update(text).digest("hex");
  console.debug(`helper.encrypt - hash: ${encrypted}`);

  if(passwordValidations(text)){
    return {
      iv: iv.toString("hex"),
      content: text, // TODO: Bypass password
    };
  }else{
    console.log('Incorrect password format');
  }
  
}

function passwordValidations(string){
  console.log('Entraste --> ',string);
  //10-20 characters long
  if(string.length >= 10 && string.length <= 20){
    console.log('Entraste --> ',string);
    let letter = 0;
    let number = 0;

    let filterLetter = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    let filterNumber = '1234567890'; 
      
    for (let i=0; i<string.length; i++){
      if (filterLetter.indexOf(string.charAt(i)) >= 0){
        letter++;
      }
      if (filterNumber.indexOf(string.charAt(i)) >= 0){
        number++
      }
      //No special characters and no spaces
      if (filterLetter.indexOf(string.charAt(i)) != -1 && filterNumber.indexOf(string.charAt(i)) != -1){
        console.log('Special characters not allowed')
      }
    } 
    //Contain letters and at least one number
    if(letter >= 1 && number >= 1){
      console.log('Entraste --> ',string);
      return true;
    }else if(letter === 0){
      console.log('Add a letter to the password');
    }else if(number === 0){
      console.log('Add a number to the password');
    }
  }
}

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Not Authorized.");
  res.redirect("/signin");
};

helpers.isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.data.type === 1) return next();
    else {
      req.flash("error_msg", "You are not allowed to do this.");
      res.redirect("back");
    }
  } else {
    req.flash("error_msg", "Not Authorized.");
    res.redirect("/signin");
  }
};

module.exports = helpers;

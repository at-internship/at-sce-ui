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
  //const encrypted = md5sum.update(text).digest("hex");
  //console.debug(`helper.encrypt - hash: ${encrypted}`);
  
  //Convert string to array
  function StringtoArray(string){

    const separador = "";
    let array = string.split(separador);

    return array;
  }

  //No spaces in password
  function FindSpacesInString(string){

    let array  = StringtoArray(string);

    if(array.indexOf(' ') === -1){
      return true;
    }else{
      return false;
    }
  }

  //10-20 characters long
  function lengthArray(string){
    let long = 0;
    let array  = StringtoArray(string);

    for(let i in array){
      if (array.hasOwnProperty(i)){
        long++;
      }
    }

    if(long >= 10 && long <= 20){
      return true;
    }else{
      return false;
    }
  }

  //Password contain a letter and at least one number
  function LetterAndNumber(string){
    let number = 0;
    let mayus = 0;
    let minus = 0;

    for(let i = 0; i < string.length; i++){
      if(string.charCodeAt(i) >= 48 && string.charCodeAt(i) <= 57){
        number = 1;
      }
      if(string.charCodeAt(i) >= 97 && string.charCodeAt(i) <= 122){
        minus = 1;
      }
      if(string.charCodeAt(i) >= 65 && string.charCodeAt(i) <= 90){
        mayus = 1;
      }
    };

    //console.log(number, minus, mayus);

    if(number === 1 && minus === 1 && mayus === 1){
      return true;
    }else{
      return false;
    };
  }

  //Special characters in password
  function SpecialCharactersInString(string){
    let specialCharacters = 0;

    for(let i = 0; i < string.length; i++){
      if(string.charCodeAt(i) >= 32 && string.charCodeAt(i) <= 47){
        specialCharacters= 1;
      }
      if(string.charCodeAt(i) >= 58 && string.charCodeAt(i) <= 64){
        specialCharacters = 1;
      }
      if(string.charCodeAt(i) >= 91 && string.charCodeAt(i) <= 96){
        specialCharacters = 1;
      }
      if(string.charCodeAt(i) >= 123 && string.charCodeAt(i) <= 255){
        specialCharacters = 1;
      }
    }

    if(specialCharacters === 0){
      return true;
    }else{
      return false;
    }
  }

  //Console.log
  /*console.log(StringtoArray(text));
  console.log(FindSpacesInString(text));
  console.log(lengthArray(text));
  console.log(LetterAndNumber(text));
  console.log(SpecialCharactersInString(text));*/

  let helperhelper = 1;

  //Comparing validations
  if (helperhelper === 1) {
    return {
      iv: iv.toString("hex"),
      content: text, // TODO: Bypass password
    };
  } else{
    console.log('La contraseña no tiene el formato correcto');
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

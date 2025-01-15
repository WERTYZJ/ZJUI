import JSEncrypt from 'jsencrypt'; 

// rsa.js  
let publicKey 
  ='MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAM51dgYtMyF+tTQt80sfFOpSV27a7t9u'
  + 'aUVeFrdGiVxscuizE7H8SMntYqfn9lp8a5GH5P1/GGehVjUD2gF/4kcCAwEAAQ=='; // 从后台获取的公钥 

// let privateKey = 'XwKsGlMcdPMEhR1B'; // 从后台获取的私钥  

export function RSAencrypt(txt) {  
	let jse = new JSEncrypt();  
	jse.setPublicKey(publicKey); // 设置公钥
	return jse.encrypt(txt); // 对数据进行加密 
}  

// export function RSAdecrypt(txt) {  
// 	let jse = new JSEncrypt();  
// 	jse.setPrivateKey(privateKey);  
// 	return jse.decrypt(txt);  
// }
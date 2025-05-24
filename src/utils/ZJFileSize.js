function FileSize(){
  return (fileSize) => {
    var a =fileSize/1024
    if(a<1){
      return (a/1024).toFixed(2) + 'B' 
    }else if(a<1024 && a>=1){
      return a.toFixed(2) + 'KB'
    }else if(a>=1024 && a<1024*1024){
      return (a/1024).toFixed(2) + 'MB' 
    }else if(a>=1024*1024){
      return (a/1024).toFixed(2) + 'GB' 
    }else{
      return 'fileSizeErr'
    }
  };
} 
export default FileSize;
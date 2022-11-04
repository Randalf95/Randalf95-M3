var fs= require('fs')
var request=require('request')


module.exports = {
    pwd: function(arg,done) {done(process.cwd());},
    date: function(arg,done) {done(Date()); },
    ls: function(arg,done) {
        fs.readdir('.', function(err, files) {
        var output=''
        if (err) throw err;
        files.forEach(function(file) {
          var string= file.toString() + "\n"
          output+= string;
        })
       done(output)
      });},
    echo: function(data,done){done(data)},
    cat: function(file, done){fs.readFile(file, 'utf8', function(err, data){
        if (err) throw err;
        done(data)
    })},
    head: function(file, done){fs.readFile(file, 'utf8', function(err, data){
        if (err) throw err;
        const lines= data.split('\n').slice(0,9).join('\n')
        
        done(lines)
    })},
    tail: function(file, done){fs.readFile(file, 'utf8', function(err, data){
        if (err) throw err;
        const lines= data.split('\n')
        let newfile= lines.slice(lines.length-11,lines.length-1).join('\n')
        
        done(newfile)
    })},
    curl: function (url, done){
        request(url, function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
   // Print the response status code if a response was received
  done(body)
});
    }
}
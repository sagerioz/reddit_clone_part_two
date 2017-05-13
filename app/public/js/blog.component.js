(function() {
  'use strict'

  angular.module('app')
    .component('blog', {
    controller: controller,
     templateUrl: './template/template.html'
   })

controller.$inject = ['blogService']
function controller(blogService) {
const vm = this
console.log("VM", vm);


vm.$onInit = function () {
   console.log("hi");
  vm.formVisible = false;
  vm.formNotVisible = true;
  vm.commentsVisible = true;
  // vm.postObj = {};
  blogService.getBlog().then(function(data){
    console.log("DATA", data);
    vm.blogDb = data
    console.log("BLOGDB", vm.blogDb);

  })

  vm.toggleForm = function () {
     vm.formVisible = !vm.formVisible
     vm.formNotVisible = !vm.formNotVisible
  }
}

vm.createPost = function () {
  let tempObj = {
    title: vm.postObj.title,
    body: vm.postObj.body,
    author: vm.postObj.author,
    image_url: vm.postObj.image_url,
    vote_count: 0,
    created_at: moment().calendar()
  }

  blogService.sendForm(tempObj).then(function (data){
    console.log("DATA after new Form", data);
    vm.blogDb.push(tempObj)
    delete vm.postObj;
  })

  vm.toggleComment = function() {
    vm.commentsVisible = !vm.commentsVisible;
  };

}

vm.countVotesUp = function (posts){
  let temp = posts.votes
   posts.votes += 1
   console.log("UP",temp);

}
vm.countVotesDown = function (posts){
  let temp = posts.votes
  if(temp > 0){
    posts.votes -= 1;
   console.log("DOWN",temp);
 }

}

}

}());

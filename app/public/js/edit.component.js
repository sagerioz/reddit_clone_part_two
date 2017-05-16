(function() {
  'use strict'

  angular.module('app')
    .component('editBlog', {
      controller: controller,
      templateUrl: './template/edit.html'
    })

  controller.$inject = ['blogService', '$stateParams', '$state']

  function controller(blogService, $stateParams, $state){
    const vm = this;

    vm.$onInit = onInit
    vm.editPost = editPost

   function onInit(){

    // const postId = $stateParams.id;
     console.log("STATEPARAMS", $stateParams.id);

     blogService.getPost($stateParams.id).then(function(data) {
     console.log("DATA", data);
     vm.editObj = data
     //  console.log("BLOGDB", vm.blogDb);
    });
   }
    function editPost() {
      blogService.editPostService(vm.editObj).then(function(data) {
      //  console.log("DATA after new Form", data);
      //  console.log("COMMENTS in DATA?", data);
      $state.go('home')
      })
    }
  }

}());

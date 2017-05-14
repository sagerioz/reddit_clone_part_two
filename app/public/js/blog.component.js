(function() {
  'use strict'

  angular.module('app')
    .component('blog', {
      controller: controller,
      templateUrl: './template/template.html'
    })

  controller.$inject = ['blogService']

  function controller(blogService, $stateParams) {
    const vm = this;
    console.log("VM", vm);
    vm.time = new Date();


    vm.toggleForm = function() {
      vm.formVisible = !vm.formVisible
      vm.formNotVisible = !vm.formNotVisible
    };

    vm.$onInit = function() {
      vm.formVisible = false
      vm.formNotVisible = true

      blogService.getBlog().then(function(data) {
        console.log("DATA", data);
        vm.blogDb = data
        console.log("BLOGDB", vm.blogDb);
      });
    }

    vm.createPost = function() {
      let tempObj = {
        title: vm.postObj.title,
        body: vm.postObj.body,
        author: vm.postObj.author,
        image_url: vm.postObj.image_url,
        vote_count: 0,
        created_at: moment().calendar()
      }
      blogService.sendForm(tempObj).then(function(data) {
        console.log("DATA after new Form", data);
        data.comments = []
        vm.blogDb.push(data)
        console.log("COMMENTS in DATA?", data);
        delete vm.postObj;
        vm.toggleForm()
      })
    }
    vm.deletePosts = function(posts) {
      blogService.deletePost(posts).then(function(data) {
        console.log("you deleted me");
      });
    }

    console.log("LINE 57");
    vm.toggleComments = function(posts) {
      posts.commentsVisible = !posts.commentsVisible
      console.log("WHATS THIS", posts.commentsVisible);
    };

    vm.countVotesUp = function (posts) {
      blogService.countVotesUp(posts).then(function(data){
        console.log("UP COUNT IN COMPONENT FUNCTION", data);
        console.log("POST COUNT IN COMPONENT FUNCTION", posts.vote_count);
        posts.vote_count += 1
      })
    }

    vm.countVotesDown = function(posts) {
      blogService.countVotesDown(posts).then(function(data){
        console.log("UP COUNT IN COMPONENT FUNCTION", data);
        console.log("POST COUNT IN COMPONENT FUNCTION", posts.vote_count);
        posts.vote_count -= 1
      })
    }
    vm.createComment = function (posts, comment) {

      blogService.createCommentService(posts, comment).then(function(data){
        console.log("COMMENT DATA", data);
        posts.comments.push(data)
        delete posts.newComment
      })
    }
  }
}());

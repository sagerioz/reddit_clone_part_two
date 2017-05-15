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
  //  console.log("VM", vm);
    vm.time = new Date();


    vm.toggleForm = function() {
      vm.formVisible = !vm.formVisible
      vm.formNotVisible = !vm.formNotVisible
    };

    vm.$onInit = function() {
      vm.formVisible = false
      vm.formNotVisible = true

      blogService.getBlog().then(function(data) {
      //  console.log("DATA", data);
        vm.blogDb = data
      //  console.log("BLOGDB", vm.blogDb);
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
      //  console.log("DATA after new Form", data);
        data.comments = []
        vm.blogDb.push(data)
      //  console.log("COMMENTS in DATA?", data);
        delete vm.postObj;
        vm.toggleForm()
      })
    }
    vm.deletePosts = function(posts) {
      if (confirm("are you sure you want to delete this post?") == true) {
        blogService.deletePost(posts).then(function() {
        console.log("you deleted me");
        vm.$onInit()
        });
          } else {
          return;
        }
      }
    //console.log("LINE 57");
    vm.toggleComments = function(posts) {
      posts.commentsVisible = !posts.commentsVisible
    };

    vm.countVotesUp = function (posts) {
      blogService.countVotesUp(posts).then(function(data){
        console.log(data);
      //  data.vote_count += 1
        posts.vote_count = data.vote_count
        console.log("UP COUNT DATA(DB)", data);
        console.log("UP COUNT VOTE_COUNT (CLIENT)", posts.vote_count);

      //  console.log("POST COUNT IN COMPONENT FUNCTION VOTE_COUNT plus one", posts.vote_count, data.vote_count);

      })
    }

    vm.countVotesDown = function(posts) {
      blogService.countVotesDown(posts).then(function(data){
        console.log(data);
        //data.vote_count -= 1
        posts.vote_count = data.vote_count
        console.log("UP COUNT DATA(DB)", data);
        console.log("UP COUNT VOTE_COUNT (CLIENT)", posts.vote_count);
      })
    }

    vm.createComment = function (posts, comment) {

      blogService.createCommentService(posts, comment).then(function(data){
        console.log("COMMENT DATA", data);
        posts.comments.push(data)
        delete posts.newComment
      })
    }

    vm.editPosts = function (posts, comment) {

      blogService.editPostService(posts, comment).then(function(data){
        console.log("COMMENT DATA", data);
        posts.comments.push(data)
        delete posts.newComment
      })
    }
  }
}());

const comments = [];
const mainInput = document.querySelector('.main-input');
const mainButton = document.querySelector('.main-button');
const commentsSection = document.querySelector('.comments');

mainButton.addEventListener('click', () => {
    comments.push({
        id: comments.length + 1,
        message: mainInput.value,
        parent: 0
    });
    createNestedComments({
        id: comments.length + 1,
        message: mainInput.value,
        parent: 0
    })
    mainInput.value = '';
})

function createNestedComments(commentObj) {
    const newComment = document.createElement('li');
    newComment.classList.add(`comment-${commentObj.id}`);
    const commentText = document.createElement("p");
    commentText.innerText = commentObj.message;
    newComment.appendChild(commentText);
    const replyButton = document.createElement('button');
    const commentReaction = document.createElement("div");
    commentReaction.className = `reaction-${commentObj.id}`;
    replyButton.innerText = 'Reply';
    replyButton.addEventListener('click', (e) => handleReply(e, commentObj));
    commentReaction.appendChild(replyButton);
    newComment.appendChild(commentReaction);
    const commentsUl = document.createElement('ul');
    newComment.appendChild(commentsUl);
    if (commentObj.parent === 0) {
        commentsSection.appendChild(newComment);
    }
    if (commentObj.parent !== 0) {
        const currParent = document.querySelector(`.comment-${commentObj.parent}`).querySelector('ul');
        currParent?.appendChild(newComment);
    }
}
function handleReply(e, commentObj) {
    const reaction = document.querySelector(`.reaction-${commentObj.id}`);
    reaction.removeChild(e.target);
    const newInput = document.createElement('input');
    const newSubmitButton = document.createElement('button');
    newSubmitButton.innerText = 'Submit';
    newSubmitButton.addEventListener('click', () => {
        comments.push({
            id: comments.length + 1,
            message: newInput.value,
            parent: commentObj.id
        });
        createNestedComments({
            id: comments.length + 1,
            message: newInput.value,
            parent: commentObj.id
        });
        while (reaction.lastChild) {
            reaction.lastChild.remove();
        }
        reaction.appendChild(e.target);
    });
    reaction.appendChild(newInput);
    reaction.appendChild(newSubmitButton);
    newInput.focus();
}
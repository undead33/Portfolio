export const parseRequestURL = () => {
    const url = location.hash.slice(2),
        request = {};

    [request.resource, request.id, request.action] = url.split('/');

    return request;
};

export const redirectTo = (page, id, action) => location.hash = `#/${page}${id ? `/${id}` : ''}${action ? `/${action}` : ''}`;

export const capitalizeFirstLetter = arr => arr.map(e => e && `${e[0].toUpperCase()}${e.slice(1)}`);

export const confirmAction = question => new Promise(resolve => {
    const actionConfirmationWindow = document.getElementsByClassName('action_confirmation')[0],
        addPositionBtn = document.getElementsByClassName('position__add')[0],
        actionConfirmationQuestion = document.getElementsByClassName('action_confirmation__question')[0],
        confirmationResultMessage = document.getElementsByClassName('action_confirmation__result')[0],
        actionConfirmationBtns = document.getElementsByClassName('action_confirmation__buttons')[0],
        yes = document.getElementsByClassName('action_confirmation__yes')[0],
        no = document.getElementsByClassName('action_confirmation__no')[0];

    if (addPositionBtn) addPositionBtn.classList.add('hidden');
    actionConfirmationWindow.classList.remove('hidden');
    actionConfirmationWindow.classList.add('flex');
    actionConfirmationQuestion.classList.remove('hidden');
    actionConfirmationQuestion.textContent = `Do you really want to ${question}?`;
    confirmationResultMessage.textContent = '';
    actionConfirmationBtns.classList.remove('hidden');
    actionConfirmationBtns.classList.add('flex');

    yes.addEventListener('click', () => {
        actionConfirmationQuestion.classList.add('hidden');
        actionConfirmationBtns.classList.remove('flex');
        actionConfirmationBtns.classList.add('hidden');

        setTimeout(() => {
            actionConfirmationWindow.classList.remove('flex');
            actionConfirmationWindow.classList.add('hidden');
            addPositionBtn.classList.remove('hidden');
        }, 2000);

        resolve(true);
    });

    no.addEventListener('click', () => {
        actionConfirmationWindow.classList.remove('flex');
        actionConfirmationWindow.classList.add('hidden');
        addPositionBtn.classList.remove('hidden');

        resolve(false);
    });
});
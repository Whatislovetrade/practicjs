import checkNumInput from "./checkNumInput";

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeigth = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox'),
          btnType = document.querySelector('.button.popup_calc_profile_button'),
          btnHeigth = document.querySelector('.button.popup_calc_button');
    
    checkNumInput('#width');
    checkNumInput('#height');

    // Первая проверка на заполненность form, width и height
    const validateState = () => {
        return (
            state.form !== undefined && state.form !== '' &&
            state.width !== undefined && state.width !== '' &&
            state.height !== undefined && state.height !== ''
        );
    };

    // Вторая проверка на заполненность type и profile
    const validateState2 = () => {
        return (
            state.type !== undefined && state.type !== '' &&
            state.profile !== undefined && state.profile !== ''
        );
    };

    // Переключение состояния первой кнопки
    function toggleBtns() {
        if (validateState()) {
            btnHeigth.removeAttribute('disabled');
        } else {
            btnHeigth.setAttribute('disabled', true);
        }
    }

    // Переключение состояния второй кнопки
    function toggleBtnNext() {
        if (validateState() && validateState2()) {
            btnType.removeAttribute('disabled');
        } else {
            btnType.setAttribute('disabled', true);
        }
    }

    // Функция для привязки событий
    function bindActionToElems(event, element, prop) {
        element.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN': 
                        state[prop] = i;
                        break;
                    case 'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            state[prop] = i === 0 ? 'Холодное' : 'Теплое';
                            element.forEach((box, j) => {
                                box.checked = i === j;
                            });
                        } else {
                            state[prop] = item.value;
                        }
                        break;
                    case 'SELECT': 
                        state[prop] = item.value;
                        break;
                }

                console.log(state)
                toggleBtns();
                toggleBtnNext();

            });
        });
    }

    toggleBtns();
    toggleBtnNext();

    bindActionToElems('click', windowForm, 'form');
    bindActionToElems('input', windowHeigth, 'height');
    bindActionToElems('input', windowWidth, 'width');
    bindActionToElems('change', windowType, 'type');
    bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;

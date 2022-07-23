import './user-form.js';
import './render.js';
import './controls.js';
import './filters-form.js';
import './avatar.js';
import { setUserFormSubmit } from './user-form.js';
import { closeEditForm } from './user-form.js';
import {renderPictures} from './render.js';
import {load} from './load.js';

setUserFormSubmit(closeEditForm);
load(renderPictures);

// window.console.log(renderPictureCards(mocks,getPictureCardTemplate));


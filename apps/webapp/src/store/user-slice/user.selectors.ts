import { State } from '../index';
import { NameSpace } from '../../app.constants';

export const getUserState = (state: State) => state[NameSpace.User];

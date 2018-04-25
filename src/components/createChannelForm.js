import  React from 'react';
import { Field, reduxForm } from 'redux-form';

import 'react-widgets/dist/css/react-widgets.css';


let CreateChannelForm = props => {
    const { handleSubmit, pristine, reset, submitting } = props
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Channel Name</label>
                    <div>
                        <Field name="channelName" component="input" type="text" placeholder="Channel Name" className="ant-input"/>
                    </div>
                </div>
                <div>
                    <label>Description</label>
                    <div>
                        <Field name="description" component="textarea"/>
                    </div>
                </div>
                <div>
                    <button type="submit" disabled={pristine || submitting}>Submit</button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>
                        Cancel
                    </button>
                </div>
            </form>
        )
};

CreateChannelForm =  reduxForm({
    form: 'createCreateForm', // a unique identifier for this form
})(CreateChannelForm);

export default CreateChannelForm;
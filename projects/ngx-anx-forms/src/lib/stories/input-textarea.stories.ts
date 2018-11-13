import { storiesOf } from '@storybook/angular';
import { withNotes } from '@storybook/addon-notes';
import {
    withKnobs,
    boolean,
    text,
} from '@storybook/addon-knobs/angular';

import { InputComponent } from '../components/input/input.component';
import { InputErrorComponent } from '../components/input-error/input-error.component';
import { InputTextareaComponent } from '../components/input-textarea/input-textarea.component';
import { DefaultErrorMessageService, ErrorMessageService } from 'ngx-anx-forms/services/error-message.service';


const metaData = {
    moduleMetadata: {
        declarations: [
            InputComponent,
            InputTextareaComponent,
            InputErrorComponent,
        ],
        providers: [
            {
                provide: ErrorMessageService,
                useClass: DefaultErrorMessageService
            },
        ]
    }
};

const template = {
    template: `
        <anx-forms-input-textarea
            [type]="type"
            [placeholder]="placeholder"
            [readonly]="readonly"
            [errors]="errors"
            [errorMessages]="errorMessages"
            [floatingPlaceholder]="floatingPlaceholder"
            [(ngModel)]="value"
        ></anx-forms-input-textarea>
    `,
};

storiesOf('NGX Forms|Input textarea', module)
    .addDecorator(withKnobs)

    .add('default', () => ({
        ...metaData,
        template: '<anx-forms-input-textarea></anx-forms-input-textarea>',
    }))
    .add(
        'with knobs',
        withNotes('This story uses knobs.')(() => {
            const
                value = text('value', 'Input text'),
                readonly = boolean('readonly', false),
                floatingPlaceholder = boolean('floatingPlaceholder', false);

            return {
                ...metaData,
                ...template,
                props: {
                    type: 'text',
                    placeholder: 'Text',
                    value: value,
                    readonly: readonly,
                    floatingPlaceholder: floatingPlaceholder,
                },
            };
        })
    )
    .add('with errors', withNotes('Errors will be displayed after the user touches the input.')(() => ({
        ...metaData,
        ...template,
        props: {
            type: 'text',
            placeholder: 'Errors after touch',
            errors: {
                'required': true,
                'other': true,
            },
        },
    })))
    .add('with custom errors', withNotes('Errors will be displayed after the user touches the input.')(() => ({
        ...metaData,
        ...template,
        props: {
            type: 'text',
            placeholder: 'Custom errors after touch',
            errors: {
                'required': true,
                'error1': true,
                'error2': true,
                'other': true,
            },
            errorMessages: {
                'required': 'Custom required error message',
                'error1': "Custom error 1",
                'error2': "Custom error 2",
                'error3': "Custom error 3",
            }
        },
    })))
;

import { Component, forwardRef, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';

import { InputComponent } from '../../simple/input/input.component';


@Component({
    selector: 'anx-forms-input-select',
    templateUrl: './input-select.component.html',
    styleUrls: [
        './input-select.component.scss',
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputSelectComponent),
            multi: true,
        },
    ],
})
export class InputSelectComponent extends InputComponent {

    @Input() options: {}[];
    @Input() bindLabel: string;
    @Input() bindValue: string;
    @Input() placeholder = '';
    @Input() multiple = false;
    @Input() closeOnSelect = true;
    @Input() notFoundText = '-';
    @Input() clearable = true;

    @ViewChild('inputField', { static: true }) inputField: NgModel;

    constructor(protected elRef: ElementRef,
                private config: NgSelectConfig) {
        super(elRef);
        this.config.notFoundText = '-';
    }
}

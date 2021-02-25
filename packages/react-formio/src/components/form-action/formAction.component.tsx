import FormioUtils from "formiojs/utils";
import React, { PropsWithChildren, ReactElement } from "react";
import {
  ActionDefaultsSchema,
  ActionSchema,
  FormOptions,
  Submission
} from "../../interfaces";
import { Form } from "../form/form.component";

function mapData(options: any, defaults: ActionDefaultsSchema): any {
  return {
    ...defaults,
    ...options
  };
}

function mapSettingsForm({ action, ...settingsForm }: any): any {
  FormioUtils.eachComponent(settingsForm.components, (component: any) => {
    const resourceExclude = "";

    if (component.type === "resourcefields") {
      component.type = "select";
      component.label = component.title;
      component.dataSrc = "url";
      component.data = {
        url: `${component.basePath}?type=resource${resourceExclude}`
      };
      component.valueProperty = "_id";
      component.template = "<span>{{ item.title }}</span>";
      component.persistent = true;
    }
  });

  return settingsForm;
}

export interface FormActionProps {
  actionInfo: Partial<ActionSchema>;
  submission?: Partial<Submission>;
  onSubmit?: Function;
  options: FormOptions;
}

export function FormAction({
  actionInfo,
  submission = {},
  children,
  onSubmit,
  options
}: PropsWithChildren<FormActionProps>): ReactElement {
  submission = mapData(submission, actionInfo.defaults);
  return (
    <div>
      {children}

      <Form
        form={mapSettingsForm(actionInfo.settingsForm)}
        submission={{ data: submission }}
        onSubmit={onSubmit}
        options={options}
      />

      {children}
    </div>
  );
}

import * as Yup from 'yup';

export const taskSchema = Yup.object().shape({
  subject: Yup.string().required('Subject is required'),
  status: Yup.string().oneOf(['Open', 'Working', 'Completed']).required(),
  parent_id: Yup.string().nullable(),
  estimated_hour: Yup.number().positive().required(),
  sprint_id: Yup.string().required('Sprint is required'),
  description: Yup.string().required('Description is required'),
});

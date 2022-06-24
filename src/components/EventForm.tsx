import { Form, Input, DatePicker, Row, Button, Select } from "antd";
import { Moment } from "moment";
import { FC, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";
import { IUser } from "../models/IUser";
import { formatDate } from "../utils/date";
import { rules } from "../utils/rules";

interface EventFormProps {
  guests: IUser[];
  sumbit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: "",
    date: "",
    description: "",
    guest: "",
  } as IEvent);

  const { user } = useTypedSelector((state) => state.auth);

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({ ...event, date: formatDate(date?.toDate()) });
    }
  };

  const submitForm = () => {
    props.sumbit({ ...event, author: user.username });
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Описание события"
        name="description"
        rules={[rules.required(), rules.max(20), rules.min()]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          value={event.description}
        />
      </Form.Item>

      <Form.Item
        label="Дата события"
        name="date"
        rules={[
          rules.required(),
          rules.isDateAfter("Нельзя создать событие в прошлом"),
        ]}
      >
        <DatePicker onChange={(data) => selectDate(data)} />
      </Form.Item>

      <Form.Item label="Выберите гостя" name="guest" rules={[rules.required()]}>
        <Select
          style={{ width: 120 }}
          onChange={(guest: string) => setEvent({ ...event, guest })}
        >
          {props.guests.map((guest) => (
            <Select.Option key={guest.username} value={guest.username}>
              {guest.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default EventForm;
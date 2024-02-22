import { Avatar, List, message } from "antd";
import { useEffect, useState } from "react";

const data = [
  {
    title: "Ant Design Title 1",
  },
];

const ContactPageList = () => {
  const [dataSource, setDatasource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/contacts`);

        if (response.ok) {
          const data = await response.json();
          setDatasource(data);
        } else {
          message.error("Coupon failed");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [apiUrl]);
  console.log(dataSource);

  return (
    <>
      <List
        loading={loading}
        dataSource={data}
        renderItem={() => (
          <>
            {dataSource.map((contact) => (
              <List.Item key={contact._id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${contact._id}`}
                    />
                  }
                  title={<a>{contact.subject}, {contact.name}, {contact.email}</a>}
                  description={contact.message}
                 
                />{" "}
              </List.Item>
            ))}
          </>
        )}
      />
    </>
  );
};

export default ContactPageList;

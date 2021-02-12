import { createServer, Model } from "miragejs";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (environment = "development") {
  return createServer({
    environment,
    models: {
      reminder: Model,
    },
    seeds(server) {
      server.create("reminder", { text: "Walk the dog" });
      server.create("reminder", { text: "Take out the trash" });
      server.create("reminder", { text: "Work out" });
    },
    routes() {
      this.urlPrefix = "http://localhost:3000";
      this.namespace = "/api";
      this.get("/reminders", (schema) => {
        return schema.reminders.all();
      });

      this.post("/reminders", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);

        return schema.reminders.create(attrs);
      });

      this.delete("/reminders/:id", (schema, request) => {
        let id = request.params.id;

        return schema.reminders.find(id).destroy();
      });
    },
  });
}

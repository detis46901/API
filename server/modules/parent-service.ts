var Model;
var Instance;

abstract class ParentService {
    get(rowID: number): Promise<any> {
        return Model.findById(rowID);
    }

    create(request: any): Promise<any> {
        return Model.create(request);
    }

    delete(ID: number) {
        return Model.findById(ID).then((Instance) => {
            return Instance.destroy();
        });
    }
}
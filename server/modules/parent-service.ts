var Model;
var Instance;

abstract class ParentService {    
    get(rowID: number): Promise<any> {
        return Model.findByPk(rowID);
    }

    create(request: any): Promise<any> {
        return Model.create(request);
    }

    delete(ID: number) {
        return Model.findByPk(ID).then((Instance) => {
            return Instance.destroy();
        });
    }
}
export default class StudentsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = () => {
        return this.dao.getAll();
    }
    getBy = (params) => {
        return this.dao.getBy(params);
    }
    getById = (id) => {
        return this.dao.getById(id);
    };
    createStudent = (student) => {
        return this.dao.save(student);
    }
    update = (id, student) => {
        return this.dao.updateStudent(id, student);
    }
    updateConnection = (id, date) => {
        return this.dao.updateConnection(id, date);
    };
    findByUsername = async (username) => {
        return this.dao.findByUsername(username);
    };
};
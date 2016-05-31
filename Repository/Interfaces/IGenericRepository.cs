using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ER_application.Repository.Interfaces
{
    public interface IGenericRepository<T> where T : class 
    {
        ICollection<T> GetAll();
        T Get(int id);
        T Add(T t);
        void Update(T updated, int key);
        void Delete(T t);
        int Count();
    //IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);
    //void Add(T entity);
    //void Delete(T entity);
    //void Edit(T entity);
    //void Save();
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Data.Entity;
using ER_application.Models;
using ER_application.Repository.Interfaces;

namespace ER_application.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected EREntities context;

        public GenericRepository(EREntities c)
        {
            context = c;
        }

        public ICollection<T> GetAll()
        {
            context.Configuration.ProxyCreationEnabled = false;
            return context.Set<T>().ToList();
        }

        //public async Task<ICollection<T>> GetAllAsync()
        //{
        //    return await context.Set<T>().ToListAsync();
        //}

        public T Get(int id)
        {
            return context.Set<T>().Find(id);
        }

        //public async Task<T> GetAsync(int id)
        //{
        //    return await context.Set<T>().FindAsync(id);
        //}

        public T Find(Expression<Func<T, bool>> match)
        {
            return context.Set<T>().SingleOrDefault(match);
        }

        //public IList<T> GetList(Func<T, bool> where, params Expression<Func<T, object>>[] navigationProperties)
        //{
        //    List<T> list;
        //    context.Configuration.ProxyCreationEnabled = false;
        //    using (context)
        //    {
        //        IQueryable<T> dbQuery = context.Set<T>();

        //        //Apply eager loading
        //        foreach (Expression<Func<T, object>> navigationProperty in navigationProperties)
        //            dbQuery = dbQuery.Include<T, object>(navigationProperty);

        //        list = dbQuery
        //            .AsNoTracking()
        //            .Where(where)
        //            .ToList<T>();
        //    }
        //    return list;
        //}

        //public async Task<TObject> FindAsync(Expression<Func<TObject, bool>> match)
        //{
        //    return await context.Set<TObject>().SingleOrDefaultAsync(match);
        //}

        //public ICollection<TObject> FindAll(Expression<Func<TObject, bool>> match)
        //{
        //    return context.Set<TObject>().Where(match).ToList();
        //}

        //public async Task<ICollection<TObject>> FindAllAsync(Expression<Func<TObject, bool>> match)
        //{
        //    return await context.Set<TObject>().Where(match).ToListAsync();
        //}

        public T Add(T t)
        {
            context.Set<T>().Add(t);
            context.SaveChanges();
            return t;
        }

        //public async Task<T> AddAsync(T t)
        //{
        //    context.Set<T>().Add(t);
        //    await context.SaveChangesAsync();
        //    return t;
        //}

        public T Update(T updated,int key)
        {
            if (updated == null)
                return null;

            T existing = context.Set<T>().Find(key);
            if (existing != null)
            {
                context.Entry(existing).CurrentValues.SetValues(updated);
                context.SaveChanges();
            }
            return existing;
        }

        //public async Task<T> UpdateAsync(T updated, int key)
        //{
        //    if (updated == null)
        //        return null;

        //    T existing = await context.Set<T>().FindAsync(key);
        //    if (existing != null)
        //    {
        //        context.Entry(existing).CurrentValues.SetValues(updated);
        //        await context.SaveChangesAsync();
        //    }
        //    return existing;
        //}

        public void Delete(T t)
        {
            context.Set<T>().Remove(t);
            context.SaveChanges();
        }

        //public async Task<int> DeleteAsync(T t)
        //{
        //    context.Set<T>().Remove(t);
        //    return await context.SaveChangesAsync();
        //}

        public int Count()
        {
            return context.Set<T>().Count();
        }

        //public async Task<int> CountAsync()
        //{
        //    return await context.Set<T>().CountAsync();
        //}
    }
}
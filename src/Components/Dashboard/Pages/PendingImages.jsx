import React, { useState, useEffect } from "react";

const PendingImages = () => {
  const [users, setUsers] = useState([]);

  // Simulate fetching data from an API
  useEffect(() => {
    // Example user data
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          image:
            "https://live.staticflickr.com/2947/15281973177_58b6cf563a_b.jpg",
          email: "sajid@example.com",
          role: "Admin",
          userId: "@sajid",
          status: "pending",
        },
        {
          id: 2,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSkjvVDrQ1WOF6-pXSXHOyLUMhVO99KP67jg&s",
          email: "ashraf@example.com",
          role: "Editor",
          userId: "@ashraf",
          status: "pending",
        },
        {
          id: 3,
          image:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQDw8QEBAQDw0NDw0NDQ0OEA8NDQ0NFREWFhURFRUYHSghGBolGxUVITEhJikrLi4uFx8zODMtOCgtMCsBCgoKDg0OFxAQGisdFR0tMi0tLS0tLS0tKystLSstLS0tKy0tLS0rKy0tLSsrLS0tKy0rKy0rLS0rLS0rLSstNP/AABEIALcBEwMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAORAAAgEDAQUFBAgGAwAAAAAAAAECAxESIQQFMUFRE2FxgZEGIlKhFDJCkrHB0fAjM2JyguEVJLL/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/xAAoEQEAAgICAQMEAQUAAAAAAAAAARECEgMhMQQTUSIyQWGBI1KRofD/2gAMAwEAAhEDEQA/APCGViNRPe8aRl4hYCAsXYLFoRYLGiQ1EDLEEjfAMCDJIqxqoDwAxsOxtgGBRjYLGriJxAyaE0auIsSDOwmaYk2KIuNMeI1EoAsWolKIRCQ1E0USlEDHELGziTiFZ2E0a4isBi0S0buJLiBg0EqTSUmmoyvi3wduNjVxO7ao/wDVodc5u+itq9LceS1/bkrDybAa4AEaKJWJpiFiDPEMDWwYgZYDwNcSsSoxUCsDVRHiBliFjXEMQISHiaKJWIGWIYmuIWAwcQxOjElwAwxE4nRgLADmaFidLiTiFc+A1E6MRYhGSiUommI1EohIqxaiPEDPEWJskDiBhiJxNsRYgY4hgbYCwIrFwPQ2qP8A1aC/rqO7Wq6Lw/10OXE7dppPsqM3re8U0ocI6JNpXb053JP4WHmYDN8AKjLEWJbQrACQ7AkWkBKRSRSiUohE2GkUojxCpsS0aNEtBEjHYaQCsOwyrATYeJSiNRAzxFiZbbt0KCyq5Rh8ajOcUusml7vmcFf2j2eCUs1UpSsu0pLtVB9JqLbT8UjE5xHluMJnw9PAWAth2ynXhnSnGpDrF3s+jXFPuZ0Tsk22kkrttpJLq2atKYYBgTse30qzkqUu0UfrTgm6afTPg33JnXgSJiSYmHLiPE3cCXE0jOw1EvEaiERiJo1xE4hWLiKxq4ixFiEh2HYLECsdO0VF2dOCUklreV9XztrZq7fI57Gs6rlGMXa0eFlZvxYGAi8QLYhxFgdGI1Aza051A0UDZQKxJsurFRKUTXEeJNimaiGJqojxLZTBxFgbNCsW0pliGBsolKBNimGBSgbYDURstMlApQNcR4k2KYuB4G+N7UqWkJRnNScZwjKLwta/g7tadT6Vr5HzNPcUas51Iwqv3Y2m5J06VN2laKbV9Ned3/lfhzcsYx3NO/DxzM+LeZU3rXmozo0JYvR7RCmndXtpeV1bXSzPVp7nnKV9oUdr1v8AxaklTj/bSxxXp5nsbDrTpzi3g4pqKSUXDk0rXWlnbyOqFmrppp8GuBcY+ZTKf0zp00kklZJWSSSS7tC8TRRKxOtuVMHAhwOlxJcS2U5sB4mziFhsmrHETibNCsNimOIYm2IYiymDgLE3cSWi2UxxDE1sNIWMcBG9hiykJFqJKRaOVulHiFgQEsFguBLNIq4XIKRUDQrFpDsS1oootISRRLKKw0gAlrShCC5bKRXTcZJK7atbXW+hzbp3k5yqQdDsuzslO6UKkUsdfBNp35p9DXbajjTnJaOKUl4ppnRDZFKm4JXVWNSU25qNR4pOEE29I8Xe3NnzvWd5RE/D3el6i/28f2arKVNUldyj2s7WljTpZO15PS/cuqOnd9fOrtOP8uFSMFrddoo+/Z81rH5np7wlTpUVOOMKcVJtxUIYXpyeVorXSzXO8GuZ897F1Mtki/tOpVdTr2kpZNv7xv09557T4xioZ56xxqPzNveSKQhnueMMTRQNkspFiWiribFrSGibFMRbQDCwmyTkRBsliuNFjInErBYsGWck1TYAAmy0hDsCYZC4Kk7DsLMaZLgDJsWMtlM8RpFCuTaF1NMdyBpi4KaJjuZ3Bztq2kur0RUWByPedFadtT+8mH/KUdF2sHfhZ3/AlrUusR59PfNKTsu0vrxo1kvVxsaS3jTXGaj/AHKUV6tDWfguIPesrUKr6QZrs+0JunpCMLzTk4t48LLXRJpv9rTnr7RCrTqRhKE24SslJS1tpou8jt4/w5p2hUg5RtFXjOMG20+fvxkteXkeD1cfVFvb6afplt7S1U6NWFlFzg6KUnGP8dWvw5xir377XvLXxvYO/wBHqpq2O0TXH+iGmvAw33trq0ZSlrLZ1hT+rrCdSFO7fX3oq/G0EvHo9iYShSqwkmmqzlrZaOEenRpryN+l6Y9R2+mQ0xIGj1zLyncTYkNslrSWwuDJNRTMqAm4riSFktCHclQqbDSHcdxUHaWyWy2Kw6GdwNLCFFubJkufeb9gnzM6myeJynGXS4OGvM0UCKUbcmaNtcEy42kk4AkVk+g0rmpZSzLJ9Do7NnLt21woxym/7YrWUn3Imky1beJ52276p07pe/Ncl9WPizwt4b6nUuo6L4VpFeL5v0PPezylH3k7N/Z0RcteP7pXjxyz8Q7t4e0lW3uvHW3upcPE8ie09o71amUuNpSuvmPadj0vbRd+l9P9HDHY3UTvD3OV7tv04HKefGY6l3jhnGYuHo9pHqvJ3Dtla/2VztxfRHPDYYqNrJWtay4HPOmoq6TaV+K0fTuPLGUTPl6JuI8Ot13rj1Vmk/O3gdcXJpWnLLjhKV/keNR2h3tay4pK8eHLx5mspPK+sVpzeT/enqbmc4+2aconCfui3f8ASJwd05K3BNJx/I+h3VVlU2e8VrCcXFLnTcZqb4cFj5XPlI7ZNJrikruMl7qV+L5nr+zm2XhtEbLGUadrLT+dTyd0+CSHNyZ54Rt5j8px4YYZTr4l7FXZaa1k8k5OUrNJOFOpTqO74aqnLTld6i3RWttU42SVaEpYptqE+0lXWt3duO0X8r89doUabapqco2rU9mznCLcUoOE27K8efThyPA2nbYQ7OUKn8TZ506ypxhjmpPs5pO/wxpJ35RbMcM9ryx0+4yY4TZ87u/2qpVU75U5x+tBpydubSSu15HtbNV7SKnCcZQfBxaa8PE9sxMPJExLrcQw7zJqZnKM+jM3+lpsylJHN2U2S4S7vUbz8GrqdREuojmjHq16luEfiXqNpKbdoJyFZLvKckWJKJSG2TJ9DnebeiE5FOnzHfvOdQn0NI0+oiZJiGl11AXZoRq5+GahpGquv4L8wdTul4qzM8U+g8Uu7wOtQxcm6i6yXfZGc6kfin5Iq6+J/dTCz6p+MC1il5Oae2QjxcvNGf8AzFFfat/izta6r7ua/Bk3XSp6t/iX+nCfW87bt/UowvTTqTbtGNmlfq+4+bqTlUk51Je8+Ta91fClyPspW6T84wf4oyqUY2/lX/wgmSNWomYfFxrKMveSdvNHTHa6drvjbTou49qvRhzo1F4aHFVpQ1tGovGz/I8vPw45TdvZw80xFU8jb94qo1ShLGF7ydsXe/WL1XiVS2mEJJJtxWjja7enG5e3yhFK+fhnKD+SOSLhxScX4qS/8HnnhiqiXb3Zu5h7FOtTm/elTTa0i4u6u+crWb9TOrCmleTTSvZRSd1p+9TzO1mvq4v/ABjw80JV6nJq/wDZA8s8U35/7/Dv7nXhntai8lBKFlmm48+cW+hyt+6uOuru7pu3z9TolGTbzjJ8rxtHTpwInTivs1F3OzPZjFQ8uU3LKdZ42UVZu1klZeC/fidew7W7yyajGUYU0ruV3nGV3r0UvXQ5so2d4z8pKP5M7N2xV5e7Ky7OT4PTNL8yZVqmN29n/laS7aSlKTdWcoJpY2lKpLRN6cfm+Zwbx2yk4zjZTttVfC/uwVOUocEnp/Lej+I6PoMdVJXfawi7LV61k+XPT0PN2ugnC+Lu9oq3a1WOUNErd71537jnh90NZ+Hzu9Ks6dWOM2k4QmmmtH5cOB7HsxvSt2kH2lSpg8sKlaSg+T7ufM6J7gjUmpSlWu1G6VBdOH1z3dx7qhRqRlCnU0d7SVSMeFtU6jT9D6WMVPfh4Mu468vpdj2rtEnKE4dfqyXk0zpbhzb83b8xxqPkkl5FLx+YyjH8EbflN4ctf34ixp80vOS/U0jFL/Y3NdUjOrVslSh8MfUXZQ44Q8rmil0d/T9Se0d+Lt4f7FQnYjKPKP8A6t+BMq0fhu+iv+gTrLm15oj6VHm79yimvwJ18x/pQ9pgtLST7lp68CHtS/q9YfqW9uhwu1/g1+RMtsp9ZeSaJ1/dC/wT2mPWXyf5jnWX9XyQR2xcoyfe7mnbJ/Za85Dqfyfw5uzvr/E9YiNnP+h/eYE1j5Ln4Zu/Vr0JlQvxbGVG5KVMdntwv6haXIvN944vxLUHaFmGE+puQ7kotlKnPqZOhU+K3mdSuJ3EQOGru6cuMziqbrmuEnbxPcswsbq1jKnztfdGS97U5YbpSfA+pnTfIyezvuE4Qu8vnXuxvhFGD3TUTurLwsfUrZ33GipGPaxb93J8c9217/XfyB7prPjJ/I+xVM0jBGvbhj3HyFHckrNtN2Teuhexbvd6j5Sg153TXzR9NtytDRdxybLFYK3HS55vUfT1Dvwd9uLaIqF29ffU/NNv8zDdOxKq78IRcpeMtDv3rSvB26fqX7MpKglzTdzPp8bntefKoda2ZR7/ADZcI9z9WdTaFke2njtlZjuzdSC5jVbYZMdp9xtYtF0NnN2c+4Po0nxs/U6gua0hnaXN9F7kZy2N+B2MhyLPHjKby5Y7I19r8yvo0ucvkjZyE6g9rFd5EYW5j06kNhYusJcqduohWQCi2LkHamLBI4W6tO1H2jM1E0UR2GqjH2hNgSFlNYyGZpDZq0pomNGKZaZdkpbM2xsnEtrRA4gK5m1S4j4DuNxNWjLaJXizk2eVo28DtqU9Gc9KkcOaLduKaG0q8H4GG5FaMl3o6q1PQvY6CSuuepePGk5MrdCAqMC7HRyZalJssCBxZaZCHc1EpTQRnkLI3GSUqTM3EbkGYuEo8AwDMTkLgoYlYkqQXIp2EO4FRyYoMUK4rnJ0aJIehCZSAGAwAaBghEAIGICikiLhcotxJcUK4gKUUaJGKLiUVUWhjGJrJijEzk1gVWKcR0NFYuX1TKEiwmToTEyMgyFsnYLCzByIqkMjIWRRbJuJk2Apsm4YhiQFykyVEqwFIohDyNQh2AMgKjjyGmAGGlRZaYAUMAAAAQADAQEDuPIQFBcWQAQNSLTAABsaGBJaxDehhGQAWDJpkPIADIuIAAEO4AAXC4AAmK4AQFx5ABQZBkAFBkAAB//Z",
          email: "riduan@example.com",
          role: "Viewer",
          userId: "@riduan",
          status: "pending",
        },
        // Add more users as needed
      ];
      setUsers(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="py-2">
        <h2 className="text-2xl font-bold leading-tight pb-4 text-green-600 text-left ">
          Image Management
        </h2>
        <h3 className="text-xl font-semibold leading-tight pb-4 text-slate-600 text-left">
          Pending Images
        </h3>
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User Id
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    <img src={user.image} alt="image" width={50} />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.userId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                    {user.email}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1  inline-flex text-xs leading-5 font-semibold rounded-full  ${
                      user.status === "Live"
                        ? "text-green-800 bg-green-100"
                        : "text-red-800 bg-red-100"
                    } `}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex gap-3">
                    <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800  shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2">
                      Live
                    </button>
                    <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2">
                      Delete
                    </button>
                    <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 ">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingImages;
